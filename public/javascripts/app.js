Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

const app = new Vue({
  el: '#app',
    data(){
      return {
        loading: true,
        items: [],
        searchParams: {
          name: '',
          supertypes: '',
          types: '',
          subtypes: '',
          colors: []
        }
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      search(e){
        const that = this;
        var url = '/cards/';
        var data = this.searchParams;
        that.loading = true;
        fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log(
                'Looks like there was a problem. Status Code: '
                + response.status
              );
              return;
            }
            // Response
            response.json().then(function(data) {
              console.log(data);
              that.items = data;
              that.loading = false;
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      },
      fetchData(){
        const that = this;
        fetch('/cards/')
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log(
                'Looks like there was a problem. Status Code: '
                + response.status
              );
              return;
            }
            // Response
            response.json().then(function(data) {
              console.log(data);
              that.items = data;
              that.loading = false;
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      },
      arrayIsset: function(arr){
        return (arr != undefined && arr.length != 0) ? true : false;
      },
      printColors: function(colors){
        return this.arrayIsset(colors) ? colors.join(', ') : 'Colorless';
      },
      logCardDetails(data){
        console.log(data);
      },
      handleScroll(evt, el) {
        const that = this;
        if (document.body.clientHeight- window.innerHeight - window.scrollY < 50) {
          alert("END OF PAGE")
        }
        //return window.scrollY > 100
      }
    }
});
