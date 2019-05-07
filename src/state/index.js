import { computed, observable, action } from 'mobx'
import { axios } from '../services/axios'

class Store {
  // pokemons data
  @observable loading = false
  @observable rawList = []
  @observable renderList = []
  @observable pokemonTypes = []
  @observable favorites = []
  // pokemons filters
  @observable filteredItems = []
  @observable filters = {
    search: '',
    types: []
  }

  // pagination data
  @observable perPage = 10
  @observable currentPage = 1

  @computed get totalPages () {
    return Math.ceil(this.itemsCount / this.perPage)
  }

  @computed get itemsCount () {
    return this.filteredItems.length > 0 ? this.filteredItems.length : this.rawList.length
  }

  @computed get offset () {
    return (this.currentPage - 1) * this.perPage
  }

  @action getRawList = async () => {
    this.loading = true
    const params = {
      limit: 1000
    }
    // get full pokemons and types list
    return axios.all([
      axios.get('/pokemon/', { params }),
      axios.get('/type/')
    ])
      .then(([pokemons, types]) => {
        this.pokemonTypes = types.data.results
        this.rawList = pokemons.data.results
        this.filteredItems = pokemons.data.results
        return this.loadTargetItems()
      })
      .then(async () => {
        this.favorites = await JSON.parse(window.localStorage.getItem('favorites'))
      })
      .catch(err => {
        const { response } = err
        console.log('Error:', response)
      })
      .finally(() => {
        this.loading = false
      })
  }

  @action loadTargetItems = async () => {
    if (!this.filteredItems.length) {
      this.renderList = []
      return null
    }
    this.loading = true
    const urlsToLoad = this.filteredItems
      .slice(this.offset, this.offset + this.perPage)
      .map(item => item.url)
    return axios.all(urlsToLoad.map(url => axios.get(url)))
      .then(response => {
        // use getUnique function to prevent duplicates
        // in case a pokemon belongs to more than 1 type
        this.renderList = this.getUnique(response.map(res => res.data), 'name')
      })
      .catch(err => {
        console.log('Error: ', err.response)
      })
      .finally(() => {
        this.loading = false
      })
  }

  @action getByTypes = async (types) => {
    this.loading = true
    return axios.all(types.map(type => axios.get(`/type/${type}/`)))
      .then(([...data]) => {
        const results = []
        data.forEach(typeList => {
          results.push(...typeList.data.pokemon.map(item => item.pokemon))
        })
        return results
      })
      .catch((err) => {
        console.log('Error:', err.response)
      })
      .finally(() => {
        this.loading = false
      })
  }

  @action toggleFavorite = async (id) => {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter((favId) => favId !== id)
    } else {
      this.favorites.push(id)
    }
    await window.localStorage.setItem('favorites', JSON.stringify(this.favorites))
  }

  @action onPerPageChange = async (value) => {
    this.perPage = value
    // reset current page
    this.currentPage = 1
    this.loadTargetItems()
  }

  @action onPageChange = (page) => {
    this.currentPage = page
    this.loadTargetItems()
  }

  @action toggleType = (type) => {
    if (this.filters.types.includes(type)) {
      this.filters.types = this.filters.types.filter(item => item !== type)
    } else {
      this.filters.types.push(type)
    }
    this.filterItems()
  }

  @action updateSearchFilter = (value = '') => {
    this.filters.search = value
  }

  @action resetTypeFilter = () => {
    this.filters.types = []
    this.filterItems()
  }

  @action filterItems = async () => {
    const { search: name, types } = this.filters
    let tempList = this.rawList.slice()
    if (types.length) {
      tempList = await this.getByTypes(types)
    }
    // reset active page to 1 if search box isn't empty
    if (!name || name.length) this.currentPage = 1
    // filter items by pokemon's name
    const regex = new RegExp(name, 'i')
    this.filteredItems = tempList.filter((item) => {
      return regex.test(item.name)
    })
    this.loadTargetItems()
  }

  getUnique = (array, prop) => {
    return array
      .map(e => e[prop])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => array[e]).map(e => array[e])
  }
}

// create state
const state = new Store()
export {
  state
}
