import Vue from 'vue';
import {
  Button,
  Container,
  Header,
  Main,
  Icon,
  Card,
  Select,
  Option,
  Input,
  Form,
  Row,
  FormItem,
  Switch,
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/de';
import locale from 'element-ui/lib/locale';

locale.use(lang);

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Switch);
