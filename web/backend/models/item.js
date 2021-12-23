class Item {
  constructor(asin, brand, title, url, image, rating, reviewUrl, totalRatings, price, originalPrice) {
    this.asin = asin;
    this.brand = brand;
    this.title = title;
    this.url = url;
    this.image = image;
    this.rating = rating;
    this.reviewUrl = reviewUrl;
    this.totalRatings = totalRatings;
    this.price = price;
    this.originalPrice = originalPrice;
  }
}

module.exports = Item;