import { useEffect, useState } from "react";
import { useMemo } from "react";
import useObserver from "../composables/useObserver";
import cardContentPreparation from "../helpers/cardContentPreparation";
import cardCommentsPreparation from "../helpers/cardCommentsPreparation";
import dataFetch from "../api/index";

import CardModalTemplate from "./self-components/CardModalTemplate";
import Modal from "./self-components/Modal";
import CardList from "./self-components/CardList";

const { getCardContent, getCardComments } = dataFetch();

function Layout({ cards, getCardsBySpecificPage }) {
  const [isVisible, setModalState] = useState(false);
  const [activeCardId, setCardId] = useState(null);
  const [cardContent, setCardContent] = useState(null);
  const [cardComments, setCardComments] = useState(null);
  const [isLoading, setLoadingStatus] = useState(false);
  const [lastElement, setLastElement] = useState(null);
  const [visibilityAnimation, setVisibilityAnimation] = useState(null);

  let currentLoadedpage = 1;

  const { observer } = useObserver(() => {
    currentLoadedpage += 1;
    getCardsBySpecificPage(currentLoadedpage);
  });

  useEffect(() => {
    if (isVisible) {
      /* Remove possibility to scroll in case modal is opened */
      document.body.style.overflow = "hidden";

      setVisibilityAnimation({
        opacity: "1",
        transition: "all .2s",
        visibility: "visible",
      });

      return;
    }

    setVisibilityAnimation({
      opacity: "0",
      transition: "all .2s",
      visibility: "hidden",
    });

    document.body.style.overflow = "unset";
  }, [isVisible]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement, observer]);

  useEffect(() => {
    if (activeCardId) {
      setLoadingStatus(true);

      const cardImage = cards.find((card) => card?.id === activeCardId);

      Promise.allSettled([
        getCardContent(activeCardId),
        getCardComments(activeCardId),
      ]).then((values) => {
        const cardContent = values[0];
        const cardComments = values[1]?.value || [];

        if (cardContent?.reason) {
          console.error(
            `Card conent is empty or request has not been passed/ Content status: ${cardContent.status}, content reason: ${cardContent.reason}`
          );

          setLoadingStatus(false);
          setModalState(false);

          return;
        }

        setCardContent(
          cardContentPreparation.generateContentFormat(
            cardContent.value,
            cardImage
          )
        );
        setCardComments(
          cardCommentsPreparation.generateCommentsFormat(cardComments)
        );

        setLoadingStatus(false);
      });
    }
  }, [activeCardId, cards]);

  const closeModal = () => {
    setModalState(false);
    setCardId(null);
  };

  const cardItems = useMemo(() => {
    const handleCardClick = (clickedCardId) => {
      setModalState(true);
      setCardId(clickedCardId);
    };

    return (
      <CardList
        cards={cards}
        setLastElement={setLastElement}
        handleCardClick={handleCardClick}
      />
    );
  }, [cards]);

  // TODO: Update modal animation for conditional rendering
  const modalContent =
    isVisible && activeCardId ? (
      <Modal
        isLoading={isLoading}
        closeModal={closeModal}
        content={
          <CardModalTemplate
            image={cardContent?.img}
            title={cardContent?.title}
            subTitle={cardContent?.subTitle}
            comments={cardComments}
          />
        }
      />
    ) : null;

  return (
    <>
      <div style={visibilityAnimation}>{modalContent}</div>
      <div className="container">{cardItems}</div>
    </>
  );
}

export default Layout;
