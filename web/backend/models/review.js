class Review {
  constructor(asin, name, rating, date, verified, title, body, helpfulVotes, country) {
    this.asin = asin;
    this.name = name;
    this.rating = rating;
    this.date = date;
    this.verified = verified;
    this.title = title;
    this.body = body;
    this.helpfulVotes = helpfulVotes;
    this.country = country;
  }
}

module.exports = Review;