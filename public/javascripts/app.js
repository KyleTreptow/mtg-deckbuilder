const app = new Vue({
  el: '#app',
    data(){
      return {
        loading: true,
        message: msg,
        items: []
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
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
