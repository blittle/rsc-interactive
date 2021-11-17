import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
  Image,
  Link,
} from '@shopify/hydrogen';
import InteractiveHome from '../components/InteractiveHome.client';
import { MODES } from '../helpers/modes';

export default function Index() {
  return <InteractiveHome modes={MODES} />
}
