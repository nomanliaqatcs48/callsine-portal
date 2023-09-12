import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteStripeCard,
  getStripeCards,
  setDefaultStripeCard,
} from "src/services/payments.service";

interface CardInfo {
  id?: number;
  last4: string;
  cardType?: string;
  expMonth?: number;
  expYear?: number;
  isDefault: boolean;
}

interface CurrentCardsProps {
  onUpdateCard: (cardId: number, updatedCard: CardInfo) => void;
}

const CurrentCards: React.FC<CurrentCardsProps> = ({ onUpdateCard }) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedCard, setEditedCard] = useState<CardInfo | null>(null);
  const [cards, setCards] = useState<CardInfo[]>([]);

  const handleEditCard = (card: CardInfo) => {
    if (card.id !== undefined) {
      setIsEditing(card.id);
      setEditedCard(card);
    } else {
      console.warn("Attempted to edit a card without an ID.");
    }
  };

  const handleUpdateCard = () => {
    if (editedCard && editedCard.id !== undefined) {
      onUpdateCard(editedCard.id, editedCard);
      setIsEditing(null);
    }
  };

  useEffect(() => {
    // Fetch cards when the component mounts
    const fetchCards = async () => {
      try {
        const response = await getStripeCards({});
        if (response && response.data) {
          setCards(response.data); // assuming the response contains an array of card objects
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []); // Empty dependency array to run only on mount

  const handleDeleteCard = async (cardId: number) => {
    try {
      await deleteStripeCard(cardId.toString()); // assuming your card ID is numeric and the backend requires it in string format
      // After successfully deleting the card from the backend, you can remove it from the local state:
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      console.log(`Successfully deleted card with ID: ${cardId}`);
    } catch (error) {
      console.error(`Error deleting card with ID ${cardId}:`, error);
    }
  };

  const handleMakeDefault = async (cardId: number) => {
    try {
      await setDefaultStripeCard(cardId.toString());
      console.log(`Successfully made card with ID ${cardId} the default card`);

      // Refresh the cards list after setting a new default
      const response = await getStripeCards({});
      if (response && response.data) {
        setCards(response.data);
      }
    } catch (error) {
      console.error(`Error setting card with ID ${cardId} as default:`, error);
    }
  };
  const styles = {
    listContainer: {
      maxHeight: "300px", // Adjust this value based on the height of 5 card items
      overflowY: "auto",
    },
  };

  return (
    <div className="tw-max-h-[300px] tw-overflow-y-auto">
      <List>
        {cards.map((card) => (
          <ListItem key={card.id}>
            <ListItemText
              primary={`**** **** **** ${card.last4}`}
              secondary={`${card.cardType} - Expires: ${card.expMonth}/${card.expYear}`}
            />
            <ListItemSecondaryAction>
              {!card?.isDefault && (
                <IconButton
                  className="tw-mr-10"
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteCard(card.id!)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              {!card.isDefault ? (
                <Button
                  className="tw-bg-blue-500"
                  variant="contained"
                  size="small"
                  onClick={() => handleMakeDefault(card.id!)}
                >
                  Make Default
                </Button>
              ) : (
                <Typography>Default </Typography>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Component to Add a new card (you might integrate this with Stripe Elements or similar) */}
      <Button variant="contained" color="primary">
        Add New Card
      </Button>
    </div>
  );
};

export default CurrentCards;
