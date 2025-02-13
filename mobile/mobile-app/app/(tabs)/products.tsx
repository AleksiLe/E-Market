import { Image, StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import getProducts, { Product } from '@/services/getProducts';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedScrollView } from '@/components/ThemedScroll';
import ProductCard from '@/components/ProductCard';
import LoadingAnimation from '@/components/LoadingAnimation';
export default function ProductScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  
  useEffect(() => {
      if (isMounted) {
          return;
      } else {
          getProducts()
              .then(setProducts)
              .catch(console.error);
          setIsMounted(true);
      }
  }, [isMounted]);
  return (
    <ThemedView style={styles.container}>
        <ThemedScrollView>
            <ThemedView style={styles.titleContainer}>
                {products ? products.map((product) => (
                    <ProductCard key={product._id} name={product.name} description={product.description} />
                )) :
                <LoadingAnimation />}
            </ThemedView>
        </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //Make gap on top so that top bar on mobile does not get covered by the content
    paddingTop: 16,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

/*
import ProductCard from '../../components/productCard.jsx';
import LoadingAnimation from '../../components/loadingAnimation.jsx';
import { useEffect, useState } from 'react';
import getProducts from '../../services/getProducts.js';

export default function ProductWindow(props) {
    
    const [products, setProducts] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (isMounted) {
            return;
        } else {
            getProducts()
                .then(setProducts)
                .catch(console.error);
            setIsMounted(true);
        }
    }, [isMounted]);
        
    return (
        <div className='flex flex-wrap'>
            {products ? products.map((product) => (
                <ProductCard key={product._id} name={product.name} description={product.description} />
            )) :
            <LoadingAnimation />}
        </div>
    );
}
*/