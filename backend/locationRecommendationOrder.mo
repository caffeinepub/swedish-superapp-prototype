import Text "mo:core/Text";
import Order "mo:core/Order";

module {
  type LocationRecommendation = {
    city : Text;
    suggestions : [Text];
  };

  public func compare(a : LocationRecommendation, b : LocationRecommendation) : Order.Order {
    Text.compare(a.city, b.city);
  };
};
