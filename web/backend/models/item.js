class Item {
  constructor(asin, brand, title, url, image, rating, reviewUrl, totalRatings, price, originalPrice, description, about, more, wireless_carrier, operating_system, color, screen_size, memory_storage_capacity, cellular_technology) {
    this.asin = asin;
    this.brand = brand;
    this.title = title;
    this.url = url;
    this.image = image;
    this.rating = rating;
    this.reviewUrl = reviewUrl;
    this.totalRatings = totalRatings;
    this.price = price.toFixed(2);
    this.originalPrice = originalPrice.toFixed(2);
    this.description = description;
    this.about = about;
    this.more = more;
    this.wireless_carrier = wireless_carrier;
    this.operating_system = operating_system;
    this.color = color;
    this.screen_size = screen_size;
    this.memory_storage_capacity = memory_storage_capacity;
    this.cellular_technology = cellular_technology;
  }
}

module.exports = Item;