<template>
  <div>
    <div class="m-4">
      <ul class="pagination">
        <li v-bind:class="[{disabled: !pagination.prev_page_url}]" class="page-item">
          <a @click="fetchArticles(pagination.prev_page_url)" class="page-link" href="#">&#8810;</a>
        </li>
        <li class="page-item disabled">
          <a
            href="#"
            class="page-link text-dark"
          >{{ pagination.current_page }} / {{ pagination.total_pages }}</a>
        </li>
        <li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item">
          <a @click="fetchArticles(pagination.next_page_url)" class="page-link" href="#">&#8811;</a>
        </li>
      </ul>
    </div>

    <div class="row">
      <div class="col-sm-8">
        <div
          v-for="article in  articles"
          v-bind:key="article.id"
          class="card m-3 shadow"
          style="width: 100%;"
        >
          <img
            class="card-img-top"
            src="https://www.w3schools.com/w3images/woods.jpg"
            alt="Card image cap"
          />
          <div class="card-body">
            <h3>{{ article.title }}</h3>
            <div>
              <h5>
                {{ article.author }},
                <span style="opacity: 0.6;">{{ article.date }}</span>
              </h5>
            </div>
            <p class="card-text">{{ article.body }}</p>
            <div class="row m-2">
              <div @click="editArticle(article)" class="mr-2 btn btn-outline-primary">Edit</div>
              <div @click="deleteArticle(article.id)" class="btn btn-outline-danger">Delete</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="m-2 shadow bg-light p-3 card">
          <div class="text-center">
            <h3>Add or edit an article!</h3>
          </div>

          <hr />

          <form @submit.prevent="addArticle()">
            <div class="form-group">
              <div class="m-2">
                <h5>Enter article title:</h5>
                <input v-model="article.title" class="form-control" type="text" />
              </div>

              <div class="m-2">
                <h5>Enter article text:</h5>
                <textarea v-model="article.body" class="form-control"></textarea>
              </div>

              <div class="m-2">
                <h5>Enter article author:</h5>
                <input v-model="article.author" class="form-control" type="text" />
              </div>
            </div>
            <button type="submit" class="btn btn-dark btn-block">Submit!</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("ContentBox mounted.");
  },
  data() {
    return {
      articles: [],
      article: {
        id: "",
        title: "",
        date: "",
        author: "",
        body: ""
      },
      article_id: "",
      pagination: {},
      edit: false
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles(page_url) {
      page_url = page_url || "api/articles";
      fetch(page_url)
        .then(response => response.json())
        .then(result => {
          this.articles = result.data;
          this.makePagination(result.meta, result.links);
        })
        .catch(error => console.log(error));
    },
    makePagination(meta, links) {
      let pagination = {
        current_page: meta.current_page,
        last_page: links.last,
        first_page: links.first_page,
        next_page_url: links.next,
        prev_page_url: links.prev,
        total_pages: meta.last_page
      };
      this.pagination = pagination;
    },
    deleteArticle(id) {
      if (confirm("Are you sure you wish to delete this article?")) {
        let url = "api/article/" + id;
        fetch(url, {
          method: "DELETE"
        })
          .then(response => response.json())
          .then(result => {
            alert("Article removed successfully!");
            this.fetchArticles();
            console.log(result);
          })
          .catch(error => console.log(error));
      }
    },
    addArticle() {
      let url = "api/article";
      if (!this.edit) {
        fetch(url, {
          method: "POST",
          body: JSON.stringify(this.article),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => response.json())
          .then(result => {
            alert("Article added successfully!");
            this.article.title = '';
            this.article.body = '';
            this.article.author = '';
            this.fetchArticles();
            console.log(result);
          })
          .catch(error => console.log(error));
      }
      else {
        fetch(url, {
          method: "PUT",
          body: JSON.stringify(this.article),
          headers: {
            "content-type": "application/json"
          }
        })
        .then(response => response.json())
        .then(result => {
          this.article.title = '';
          this.article.body = '';
          this.article.author = '';
          this.fetchArticles();
          console.log(result);
          this.edit = false;
        })
        .catch(error => console.log(error));
      }
    },
    editArticle(article) {
      this.edit = true;
      this.article.id = article.id;
      this.article.article_id = article.id;
      this.article.title = article.title;
      this.article.body = article.body;
      this.article.author = article.author;
    }
  }
};
</script>
