import { Quill } from "@vueup/vue-quill";
const Parchment = Quill.import('parchment');
const ListItem = Quill.import('formats/list/item');
const List = Quill.import('formats/list');

class SingleQuote extends ListItem { }

SingleQuote.blotName = 'single-quote';
SingleQuote.tagName = 'li'
SingleQuote.className = 'single-quote';

class ReplyQuoteContainer extends List {
  static create () {
    let tagName = 'div';
    const node = super.create(tagName);
    return node;
  }

  insertBefore(blot, ref) {
    if (blot instanceof SingleQuote) {
      super.insertBefore(blot, ref);
    } else {
      let index = ref == null ? this.length() : ref.offset(this);
      let after = this.split(index);
      after.parent.insertBefore(blot, after);
    }
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
  }
}
ReplyQuoteContainer.blotName = 'reply-quote';
ReplyQuoteContainer.className = 'reply-quote';
ReplyQuoteContainer.tagName = 'div';
ReplyQuoteContainer.defaultChild = 'single-quote';
ReplyQuoteContainer.allowedChildren = [SingleQuote];

export {
  ReplyQuoteContainer,
  SingleQuote
}