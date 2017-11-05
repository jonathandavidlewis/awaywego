export default class ConfirmService {
  constructor($q) {
    this.$inject = ['$q'];
    this.q = $q;
    this.modalIsOpen = false;
    this.title = '';
    this.desc = '';
    this.okLabel = 'OK';
    this.cancelLabel = 'Cancel';
    this.result = null;
  }

  openModal(title, desc, okLabel, cancelLabel) {
    this.modalIsOpen = true;
    this.title = title;
    this.desc = desc;
    this.okLabel = okLabel || 'OK';
    this.cancelLabel = cancelLabel || 'Cancel';
    this.result = this.q.defer();
  }

  closeModal() {
    this.modalIsOpen = false;
  }





}
