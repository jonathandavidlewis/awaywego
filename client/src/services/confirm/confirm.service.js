export default class ConfirmService {
  constructor($q) {
    this.$inject = ['$q'];
    this.q = $q;
    this.modalIsOpen = false;
    this.prompt = '';
    this.comment = '';
    this.okLabel = 'OK';
    this.cancelLabel = 'Cancel';
    this.result = null;
  }

  openModal(prompt, comment, okLabel, cancelLabel) {
    this.prompt = prompt;
    this.comment = comment;
    this.okLabel = okLabel || 'OK';
    this.cancelLabel = cancelLabel || 'Cancel';
    this.modalIsOpen = true;
    this.result = this.q.defer();
    return this.result.promise;
  }

  closeModal() {
    this.modalIsOpen = false;
  }

  modalOkClick($event) {
    $event.stopPropagation();
    this.modalIsOpen = false;
    this.result.resolve();
  }

  modalCancelClick($event) {
    $event.stopPropagation();
    this.result.reject();
    this.closeModal();
  }
}
