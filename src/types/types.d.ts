type Product = {
  id: string;
  name: string;
  description: string;
  price_in_cents: number;
  image_url: string;
  created_at: string;
  category: string;
};

interface ShoppingCartTypes extends Product {
  price: number;
  totalPrice: number;
  unit: number;
}

interface MessageAlertTypes {
  message: string;
  description: string;
  showAlert: boolean;
}
