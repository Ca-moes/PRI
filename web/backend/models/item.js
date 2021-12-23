class Item {
  constructor(asin, brand, title, url, image, rating, reviewUrl, totalReviews, price, originalPrice) {
    this.asin = asin;
    this.brand = brand;
    this.title = title;
    this.url = url;
    this.image = image;
    this.rating = rating;
    this.reviewUrl = reviewUrl;
    this.totalReviews = totalReviews;
    this.price = price;
    this.originalPrice = originalPrice;
  }
}

module.exports = Item;