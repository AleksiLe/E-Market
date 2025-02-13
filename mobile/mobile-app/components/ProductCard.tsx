import { Image, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedCardView } from './ThemedCardView';
interface ProductCardProps {
  name: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description }) => {
  
  return (
    <ThemedCardView style={styles.card}>
      <Image source={require('@/assets/images/filler.jpg')} style={styles.image} />
      <ThemedText style={styles.name}>{name}</ThemedText>
      <ThemedText style={styles.description}>{description}</ThemedText>
    </ThemedCardView>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 300,
    margin: 16,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 8,
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    textAlign: 'center',
    marginTop: 4,
  },
});

export default ProductCard;