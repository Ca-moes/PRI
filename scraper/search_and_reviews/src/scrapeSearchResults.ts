import { Page } from 'puppeteer'

import { initialize, saveToData } from '.'
import { extractSearchResultPage as extract } from './extractors'
import { CarrierCategory, SearchResult, SearchResultData } from './types'
import { createSearchUrl } from './utils'

async function scrapeSearchResults() {
  const { config, browser, workers, workerProps, date } = await initialize()
  const { brands, brandKeywords } = config

  let items = [] as SearchResult[]

  let categoryItems = [] as SearchResult[]

  const category = 'all' as CarrierCategory
  const worker = workers[0]
  const url = createSearchUrl({ brands })

  console.log(`Getting page 1 of ??? for ${category} category...`)
  await worker.goto(url, workerProps)

  const { meta, results } = await worker.evaluate(extract)
  categoryItems.push(...results.map(r => ({ ...r, category })))

  let currentPage = 2
  let totalPage = meta.totalPages

  while (currentPage <= totalPage) {
    const finishedWorkers = await Promise.all(
      workers.reduce(
        (finished, worker) => {
          if (currentPage <= totalPage) {
            const page = currentPage++
            const url = createSearchUrl({ brands, page })

            console.log(
              `Getting page ${page} of ${totalPage} for ${category} category... (${url})`
            )
            return finished.concat(
              worker.goto(url, workerProps).then(() => worker)
            )
          }
          return finished
        },
        [] as Promise<Page>[]
      )
    )

    type EvalType = Promise<SearchResultData>
    const extracted = await Promise.all(
      finishedWorkers.map(async function evaluate(worker, i): EvalType {
        try {
          return worker.evaluate(extract)
        } catch (e) {
          console.log(
            `Evaluation failed on worker #${i + 1}, reloading page...`
          )

          await worker.reload(workerProps)
          return evaluate(worker, i)
        }
      })
    )

    extracted.forEach(({ meta, results }) => {
      if (meta.totalPages > totalPage) {
        totalPage = meta.totalPages
      }
      categoryItems.push(...results)
    })

    console.log(`Saving ${category} results to separate file...`)
    saveToData(categoryItems, `${date}-items-${category}.csv`)
    items.push(...categoryItems)
  }

  await browser.close()

  if (brands.length > 0) {
    console.log('Detecting result brands...')
    items = items.map(({ asin, ...item }) => {
      const lowerUrl = item.url.toLowerCase()
      const lowerTitle = item.title.toLowerCase()

      const fromKnownBrands = brands.find(b => {
        const lower = b.toLowerCase()
        return lowerUrl.match(lower) || lowerTitle.match(lower)
      })

      const fromKeywordsResult = brandKeywords.find(kw => {
        return kw.keywords.find(w => {
          const lower = w.toLowerCase()
          return lowerUrl.match(lower) || lowerTitle.match(lower)
        })
      })

      const fromKeywords =
        typeof fromKeywordsResult !== 'undefined'
          ? fromKeywordsResult.brand
          : undefined

      const brand = fromKnownBrands || fromKeywords

      return { asin, brand, ...item }
    })
  } else {
    console.log('Brands config is empty, skipping brand detecting...')
  }

  console.log('Sorting and finding duplicates...')
  const asins = [...new Set(items.map(({ asin }) => asin))].sort()
  items = asins.map(asin => items.find(item => item.asin === asin))

  console.log(`Saving results...`)
  saveToData(items, `${date}-items.csv`)
}

scrapeSearchResults()
