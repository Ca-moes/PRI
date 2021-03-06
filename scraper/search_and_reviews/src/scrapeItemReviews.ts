import { Page } from 'puppeteer'

import { initialize, loadFromData, saveToData } from '.'
import { extractBrandPage, extractReviewPage as extract } from './extractors'
import { Review, SearchResult } from './types'
import { createReviewUrl } from './utils'

async function scrapeItemReviews() {
  const { browser, workers, workerProps, date } = await initialize()

  const results = loadFromData(`items.csv`) as SearchResult[]

  for (const [idx, { asin, totalRatings, url }] of results.entries()) {
    const itemReviews = [] as Review[]

    let currentPage = 1
    const totalPage = Math.ceil(totalRatings / 10)
    const itemProgress = `${idx + 1} of ${results.length}`

    while (currentPage <= totalPage) {
      const finishedWorkers = await Promise.all(
        workers.reduce(
          (finished, worker) => {
            if (currentPage <= totalPage) {
              const page = currentPage++
              const url = createReviewUrl({ asin, page })
              const pageProgress = `page ${page} of ${totalPage}`

              console.log(
                `Getting ${asin} (${itemProgress}, ${pageProgress})... (${url})`
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

      type EvalType = Promise<Review[]>
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

      extracted.forEach(pageReviews => {
        itemReviews.push(...pageReviews.map(r => ({ asin, ...r })))
      })
    }

    if (typeof results[idx].brand !== 'string') {
      console.log(`${asin} has no brand name, saving brand name...`)
      const firstWorker = workers[0]

      results[idx].brand = await firstWorker
        .goto(url)
        .then(() => firstWorker.evaluate(extractBrandPage))
    }

    console.log(`Saving ${asin} reviews...`)
    saveToData(itemReviews, 'reviews', `${asin}.csv`)
  }

  await browser.close()

  console.log('Updating items with no brands...')
  saveToData(results, `${date}-items.csv`)

  let mergedReviews = [] as Review[]

  console.log('Merging all reviews into one file...')
  for (const { asin } of results) {
    const reviews = loadFromData('reviews', `${asin}.csv`) as Review[]
    mergedReviews.push(...reviews)
  }

  console.log('Saving reviews...')
  saveToData(mergedReviews, `reviews.csv`)
}

scrapeItemReviews()
