import { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import dataFetch from "../api/index";

import Comments from "./self-components/Comments";
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

  let currentLoadedpage = 1;

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const element = entries[0];

        if (element.isIntersecting) {
          currentLoadedpage += 1;
          getCardsBySpecificPage(currentLoadedpage);
        }
      },
      {
        rootMargin: "30px",
      }
    )
  );

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
  }, [lastElement]);

  useEffect(() => {
    let content = null;

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

        prepareCardContent(cardContent.value);
        prepareCardComments(cardComments);

        setLoadingStatus(false);
      });

      const prepareCardContent = (cardDetails) => {
        content = {
          img: cardImage?.url || "",
          title: cardDetails.title,
          subTitle: cardDetails.body,
          comments: [],
        };

        setCardContent(content);
      };

      const prepareCardComments = (cardComments) => {
        const preparedCardComments = cardComments.map((comment) => {
          return {
            profileImg:
              "https://i.pinimg.com/236x/ae/b0/2f/aeb02fe5d0f294114aab9a0d5a05ec56.jpg",
            text: comment.body,
          };
        });

        setCardComments(preparedCardComments);
      };
    }
  }, [activeCardId, cards]);

  const contentTemplate = (
    <div className="content-modal-container">
      <div className="content-modal-image-container">
        <img
          className="content-modal-image"
          src={cardContent?.img}
          alt="Text alt"
        />
      </div>
      <div className="content-modal-content">
        <div className="content-modal-text-container">
          <h1 className="modal-title">{cardContent?.title}</h1>
          <span className="modal-subtitle">{cardContent?.subTitle}</span>
        </div>

        <Comments comments={cardComments} />
      </div>
    </div>
  );

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

  return (
    <>
      <Modal
        isVisible={activeCardId && isVisible}
        isLoading={isLoading}
        closeModal={closeModal}
        content={contentTemplate}
      />
      <div className="container">{cardItems}</div>
    </>
  );
}

export default Layout;
