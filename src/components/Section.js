export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector) // Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
  }

  renderItems () {
    // метод отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    this._items.forEach(item => {
      this._renderer(item)
    })
  }

  addItem (itemHtml) {
    // метод принимает DOM-элемент и добавляет его в контейнер.
    this._container.append(itemHtml)
  }
}

// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
