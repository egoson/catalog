<script>
export default {
  async asyncData(context) {
    context.redirect('/' + context.store.getters.catalogItems[0].id)
  },
}
</script>
