var Scraper = (function() {
  function Scraper() {
    this.readability_result;
    this.generated_obj;
  }

  Scraper.prototype.removeTagAttributes = function(content) {
    return content
            .replace(/<(?!a)(\w+).*?>/gi, '<$1>') // Remove attrs
            .replace(/<a.(class=[\"|\'].+?[\"|\']).*?>/gi, ''); // Remove <a> class attr
  }

  Scraper.prototype.setReadabilityResult = function(result) {
    this.readability_result = result;
  }

  Scraper.prototype.nullToString = function() {
    if (!this.generated_obj.lead_image_url) this.generated_obj.lead_image_url = '';
    if (!this.generated_obj.title) this.generated_obj.title = '';
    if (!this.generated_obj.author) this.generated_obj.author = '';
    if (!this.generated_obj.content) this.generated_obj.content = '';
    if (!this.generated_obj.date_published) this.generated_obj.date_published = '';
  }

  Scraper.prototype.generate = function() {
    this.generated_obj = this.readability_result;
    this.generated_obj.content = this.removeTagAttributes(this.generated_obj.content);
    this.generated_obj.generated_by = 'Readability™ Parser API';
    this.nullToString();
    return this.generated_obj;
  }

  return Scraper;
})();

module.exports = scraper = new Scraper();
