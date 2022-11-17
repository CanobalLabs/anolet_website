// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  theme: {
    defaultTheme: "anoletTheme",
    themes: {
      anoletTheme: {
        dark: true,
        colors: {
          primary: "#1B2CC1"
        }
      }
    }
  },
  components,
  directives,
})
