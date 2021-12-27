import { SearchResult, SearchResultData } from '../types'

function extractSearchResultPage() {
  const ITEMS_PER_PAGE = 24

  const selectors = {
    pagination: '.a-section.a-spacing-small.a-spacing-top-small>span',
    resultItem: 'div[data-asin][data-index][data-uuid][data-component-id].s-result-item',
    overview: '.a-row.a-size-small',
    itemTitle: '.a-link-normal.a-text-normal',
    prices: '.a-price>.a-offscreen',
  }

  const $pagination: HTMLElement = document.querySelector(selectors.pagination)

  const segments = /^[0-9]+-([0-9])+ of ([0-9]+)/.exec($pagination.innerText)
  const lastIndex = parseInt(segments[1])
  const totalResults = parseInt(segments[2])

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)
  const currentPage =
    totalPages - Math.ceil((totalResults - lastIndex) / ITEMS_PER_PAGE)

  const meta = { currentPage, lastIndex, totalPages, totalResults }

  let results = [] as SearchResult[]

  document.querySelectorAll(selectors.resultItem).forEach(el => {
    let ratings = el.querySelector(selectors.overview)
    let rating = 0
    let totalRatings = 0
    if(ratings != null) {
      const [$rating_c, $totalReviews_c] = el.querySelector(selectors.overview).children as HTMLCollectionOf<HTMLElement>
      rating = parseFloat(/^[0-9.]+/.exec($rating_c.innerText)[0])
      totalRatings = parseInt($totalReviews_c.innerText.replace(',', ''))
    }

    const $url = el.querySelector(selectors.itemTitle) as HTMLAnchorElement
    const asin = el.getAttribute('data-asin')

    const prices = [] as number[]
    el.querySelectorAll(selectors.prices).forEach((p: HTMLElement) => {
      prices.push(parseFloat(p.innerText.replace(/[$,]/gi, '')))
    })
    const { 0: price = 0, 1: originalPrice = 0 } = prices

    results.push({
      asin,
      title: el.querySelector('h2').innerText.trim(),
      url: $url.href.match(`(^.+${asin}).+`)[1],
      image: (el.querySelector('.s-image') as HTMLImageElement).src,
      rating: rating,
      reviewUrl: `https://www.amazon.com/product-reviews/${asin}`,
      totalRatings: totalRatings,
      price,
      originalPrice,
    })
  })

  return { meta, results } as SearchResultData
}

export default extractSearchResultPage
