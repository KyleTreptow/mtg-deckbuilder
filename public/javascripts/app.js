const app = new Vue({
  el: '#app',
    data(){
      return {
        loading: true,
        items: [],
        searchTerm: ''
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      search(e){
        const that = this;
        var url = '/cards/';
        var data = { name: this.searchTerm };
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
      }
    }
});
