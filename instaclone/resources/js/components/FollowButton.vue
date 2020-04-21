<template>
    <div>
        <button class="btn btn-primary" @click="followUser" v-text="buttonText"></button>
    </div>
</template>

<script>
    export default {
        props: ['userId','follows'],

        mounted() {
            console.log('Component mounted.')
        },

        data: function() {
            return {
                status: this.follows,
            }
        },

        methods: {
            followUser() {
                axios.post("/follow/" + this.userId)
                .then(response => {
                    //toggle the following status, since we clicked the button
                    this.status = !this.status;
                    if (this.status) {
                        document.getElementById("followers-count").innerHTML++;
                    }
                    else document.getElementById("followers-count").innerHTML--;
                    console.log(response.data);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        window.location = "/login";
                    }
                });
            }
        },

        computed: {
            buttonText() {
                return (this.status) ? "Unfollow" : "Follow";
            }
        }
    }
</script>
