import $ from 'jquery';

const LOADING_CLASS = 'loading-screen';

export default function removeLoadingPage() {
  $(`.${LOADING_CLASS}`)
    .delay(1000)
    .queue(function() {
      $(this).remove().dequeue();
    });
}
