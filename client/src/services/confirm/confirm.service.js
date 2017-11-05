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
    this.title = title;
    this.desc = desc;
    this.okLabel = okLabel || 'OK';
    this.cancelLabel = cancelLabel || 'Cancel';
    this.modalIsOpen = true;
    this.result = this.q.defer();
    return this.result.promise;
  }

  closeModal() {
    this.modalIsOpen = false;
  }

  modalOkClick() {
    this.modalIsOpen = false;
    this.result.resolve('confirmed');
  }

  modalCancelClick() {
    this.modalIsOpen = false;
    this.result.reject('cancelled');
  }

}
