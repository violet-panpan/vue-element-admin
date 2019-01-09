<template>
  <div class="dashboard-container">
  <component :is="currentRole"/>
         <h3 style="padding-left: 30px;">欢迎进入后台管理！！！</h3> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
      pageSize:10,
      curPage:1,
    }
  },
  computed: {
    ...mapGetters([
      'roles',
    ])
  },
  methods:{
  },
  created() {
    if (!this.roles.includes('1')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
