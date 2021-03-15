const vue = new Vue({
  el: '#todo',
  data: {
    todolists: [],
    newContent: null
  },
  mounted () {
    if (localStorage.getItem('todolists')) {
      try {
        this.todolists = JSON.parse(localStorage.getItem('todolists'))
      } catch (e) {
        localStorage.removeItem('todolists')
      }
    }
  },
  methods: {
    registration () {
      if (!this.newContent) {
        return
      }
      const todo = { content: this.newContent, checked: false }
      this.todolists.push(todo)
      this.newContent = ''
      this.save()
    },
    change (index) {
      if (this.todolists[index].checked) {
        this.todolists[index].checked = false
      } else {
        this.todolists[index].checked = true
      }
      this.save()
    },
    remove (index) {
      this.todolists.splice(index, 1)
      this.save()
    },
    save () {
      const parsed = JSON.stringify(this.todolists)
      localStorage.setItem('todolists', parsed)
    },
    completedStyle (index) {
      return {
        opacity: this.todolists[index].checked ? 0.3 : 1.0,
        'text-decoration': this.todolists[index].checked ? 'line-through' : ''
      }
    }
  }
})
