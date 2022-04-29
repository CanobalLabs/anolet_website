import Head from 'next/head'
import Metas from '../components/Metas'
import Image from 'next/image'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { House } from '@mui/icons-material';

const drawerWidth = 240;

export default function Home() {
  return (
    <>
      <Head>
        <Metas />
      </Head>
      
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Image src="/anolet.png" alt="Anolet logo" width="64" height="64"></Image>
          <Typography variant="h4">
            Anolet
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {/* main pages will be put here, e.g. home, games, etc. */}
          <ListItem button key="Home">
            <ListItemIcon>
              <House />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem button key="Log in/Sign up">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Log in/Sign up" />
        </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A necessitatibus non optio deleniti nisi, magni rerum quas, nemo consequuntur ad consectetur quae aut delectus? Unde quibusdam eos cupiditate tempore? Debitis odit quas animi dolor aliquam illum tempore ullam nulla vitae, et obcaecati nemo non totam similique rerum sapiente earum molestias saepe perspiciatis. Officia similique aliquam nihil voluptas laudantium ipsum deleniti maiores aspernatur velit, corrupti reprehenderit, magni sit totam? Consectetur itaque iste provident officia quae assumenda laborum veniam quo inventore, eveniet repellat omnis exercitationem eos consequatur voluptatum blanditiis incidunt? Assumenda laborum reprehenderit minus, tenetur architecto error provident voluptate dicta possimus totam at ut accusamus sint nemo facilis laudantium, illo sit illum! Quisquam nesciunt laborum fuga sit dolorem earum, repellat amet maxime pariatur similique voluptas illum, asperiores iure? Esse dolorem veniam odit quibusdam recusandae vero, placeat id alias dignissimos! Recusandae distinctio dolorum perspiciatis rerum quia laborum saepe aliquid voluptatum culpa ex itaque aspernatur soluta amet velit quam nemo necessitatibus eaque, fugiat obcaecati at! Recusandae quia soluta necessitatibus cum, nemo nam enim eius dolor laudantium, fugiat eligendi voluptates officia pariatur, deleniti quisquam. Accusamus quidem tempore modi maxime velit neque eaque, fugiat at, quam, quod nisi reiciendis saepe eveniet dolore illum. Suscipit, numquam. Nisi rerum voluptate, placeat in facilis obcaecati fuga voluptates omnis quod. Dolorum dolor obcaecati libero, ad doloremque eveniet, voluptatem maiores sed exercitationem assumenda minus odit aspernatur ullam nostrum veniam consequatur distinctio? Doloremque, voluptate? Quisquam animi, libero ipsum, sint vel natus excepturi repudiandae dolor assumenda omnis eveniet dolore. Fugiat natus repellendus, voluptatibus vero ex, eum eveniet inventore, repudiandae provident explicabo dolore magnam facere animi perspiciatis nam suscipit cumque praesentium rem quisquam dolorem. Voluptatum adipisci quam quaerat quidem deserunt atque, commodi vero corporis recusandae deleniti quibusdam ex sint illo reprehenderit error a facilis hic soluta, amet itaque nulla eveniet ea illum obcaecati! Blanditiis corrupti esse, laudantium animi nulla repellendus! Tempora, libero dolores ipsam sint eaque labore facilis quidem earum. Id, illum earum? Ducimus culpa porro mollitia temporibus. Odio dolore in nemo ipsum ex porro repellendus nobis maxime expedita perferendis beatae nulla, dolorum natus aspernatur. Itaque cupiditate quam reiciendis impedit, deleniti error a suscipit recusandae vitae, enim repellat pariatur dolorem cumque voluptate ratione aliquam molestiae in qui accusantium. Omnis dolorum, qui reprehenderit totam consectetur inventore illo facere ducimus nisi unde odit consequatur quo, labore quaerat molestiae aliquid. Nesciunt mollitia excepturi dolorem adipisci alias consectetur hic voluptatibus quia omnis, natus maiores. Quidem architecto est distinctio atque enim, perspiciatis temporibus. Sunt incidunt suscipit distinctio repellendus illum porro, quas amet est magni vitae doloribus, esse hic delectus! Provident, nemo? Enim, earum! Earum asperiores, iste maiores doloribus voluptatibus nesciunt provident non soluta ipsum officiis enim magni laborum, temporibus vero numquam nisi dignissimos fugiat nostrum in delectus at! Corporis, exercitationem dolore repellat delectus tempora non ullam beatae, rerum blanditiis porro fugit adipisci laborum debitis quos dolores, perferendis fugiat. Blanditiis dolorem nam vitae fuga quia aperiam ratione inventore sed voluptatum eius, saepe placeat optio odio ducimus eligendi! Aspernatur cupiditate eaque molestiae praesentium rem incidunt reiciendis fuga porro? Ea maxime illo saepe aliquam suscipit unde modi, voluptas voluptatibus, architecto nisi similique, temporibus ipsam itaque nesciunt eius ullam. Hic minus dignissimos, enim reiciendis porro laboriosam consequatur, pariatur labore eum numquam facilis id veritatis quia quaerat doloremque dolor voluptas. Esse quaerat, labore nihil pariatur perferendis velit quia, tenetur accusamus eaque id libero? Nobis dignissimos quasi tempore exercitationem facilis labore molestiae illum aut corrupti quae ipsum alias at commodi cumque in optio vitae voluptatem delectus itaque, corporis dolore, odio necessitatibus numquam. Consectetur similique voluptas maxime, quam eius maiores soluta sint, aspernatur quisquam, ea aut libero temporibus aliquam sapiente commodi suscipit distinctio veritatis earum. Veniam aliquam harum exercitationem quisquam magni et labore quidem, maxime tempora ratione repudiandae quas itaque obcaecati reprehenderit similique voluptatum placeat odio sapiente eius dicta? Ut eligendi, sapiente delectus ullam animi cupiditate minus voluptatum error nisi! Officiis voluptates quidem doloremque dolores sint. Mollitia numquam, sed quasi perspiciatis nobis dolorum. Doloribus tempore autem sequi voluptas esse obcaecati expedita nesciunt eveniet illum quasi libero amet similique quidem qui veniam aliquam, ab itaque porro, error hic velit. Maiores, alias aut. Beatae placeat tenetur obcaecati ullam, neque possimus dolorum. Aspernatur explicabo id deserunt nemo iste odio mollitia itaque voluptatum, harum autem odit maiores atque consequuntur officia repudiandae. Eum vitae laboriosam cupiditate consequuntur unde officia aliquam fugiat inventore, ipsum rerum, quaerat vero nobis enim animi non incidunt! Voluptas, omnis saepe molestiae voluptatem nemo in vel consequatur id? Sapiente aliquam aliquid eveniet ducimus deleniti eaque at, perspiciatis repudiandae nulla reprehenderit, eligendi molestias ipsum, sunt quaerat debitis. Perspiciatis accusantium a nihil totam? Blanditiis, enim asperiores tenetur praesentium hic dolore magni assumenda soluta! Dicta voluptas nobis quaerat consectetur ex iusto, quasi, quis quibusdam laudantium vitae odit a beatae eos quod esse amet explicabo ullam accusamus maxime, fuga officia placeat molestias? Officiis eaque natus ullam ipsum illo odit rem recusandae debitis consequatur explicabo eveniet voluptatum voluptate magnam aliquam, est sint suscipit facilis dolorum, modi iusto, nulla odio consectetur voluptatem maiores. Quasi non, labore saepe cum vel, deserunt incidunt aut rem exercitationem deleniti sapiente alias quos voluptatem voluptas voluptate, ipsam est eligendi quibusdam. Excepturi eveniet minus sequi ut. Possimus voluptatem eum cupiditate culpa dolorum quia quaerat distinctio sunt ad provident officiis, nisi deleniti quibusdam aspernatur odio odit perspiciatis? Deleniti ipsam ex ducimus eaque consectetur maxime veniam sunt id nostrum libero delectus consequuntur quidem fugiat voluptas vel maiores ad vitae nemo dolores placeat nobis, odit natus corporis. Distinctio corrupti rem harum dolore velit ea quos optio eos dolor, necessitatibus omnis nam totam, animi obcaecati hic id autem quia pariatur dolores non in neque, ad aperiam? Ipsam velit ipsa repudiandae voluptatum qui incidunt voluptate, sequi reiciendis deserunt libero perferendis, praesentium iure consequuntur inventore vel doloribus asperiores voluptates assumenda. Natus enim nisi reprehenderit aliquam hic doloremque laborum itaque tempora repellat magnam vero cupiditate dignissimos, deserunt provident accusantium impedit architecto nostrum voluptas consequatur nesciunt. Praesentium quis assumenda quidem? Tempora dicta ipsam natus illum. Tempora incidunt aperiam officia velit at minima? Ratione, beatae, perferendis quaerat minus sequi, blanditiis nemo voluptas iusto reprehenderit labore laborum! Aut, laudantium odit iure itaque vel, cum voluptatum officiis optio aliquam quam, minima modi nesciunt quibusdam accusantium laborum repellat reprehenderit placeat maiores asperiores natus. Fugit, accusamus vero!
        </Typography>
      </Box>
    </Box>
    </>
  )
}
