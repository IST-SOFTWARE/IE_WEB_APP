import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import MainLabel from "../LandingLabels/MainLabel";
import Image from "next/image";
import styles from "../../styles/LandingStyles/defaultLanding.module.scss";
import { ChildNode } from "postcss";
import useWindowDimensions from "../../Hooks/useWindowsDimensions";
import {
  setActualPosition,
  updatePosition,
} from "../../store/slices/pageTrackerSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/reduxSettings";
import { createScrollSpyConfig } from "../pageTracker/data/scrollSpy";
// import {useAppDispatch, useAppSelector} from "../../Hooks/hooks";

type LandingDescription = {
  title: string;
  subTitle?: string;
  titleOffset?: number;
};

interface LandingInterface {
  children?: React.ReactChild | React.ReactNode;
  landingDescription?: LandingDescription;
  pageBackground?: pageBackground;
  backgroundColor?: string;

  pageId?: string;
  scrollSpyTag?: string;
}

export interface pageBackground {
  backgroundItems: Array<inputData>;
  // backgroundSpreading:backgroundSpreadingVars,
  backgroundCrossFilling: boolean;
  // solidBackground: string,
}

type windowSizes = {
  width: number;
  height: number;
};

type backgroundMatrix = {
  colsNum: number;
  rowsNum: number;
};

type contentType = {
  data: string;
  contentDistance: number;
  contentOffset: { top: number; left: number };
};

type oneBlock = {
  size: number;
  content?: contentType;
};

export interface inputData {
  content: contentType;
}

const DefaultLandingPage: FC<LandingInterface> = ({
  children,
  landingDescription,
  pageBackground,
  pageId,
  scrollSpyTag,
}) => {
  const dispatch = useAppDispatch();

  // Background item - - - - - - - - - - - - - - - -
  const [windowSize, setWindowSize] = useState<windowSizes>(null);
  const [rowsBlockSize, setRowsBlockSize] = useState<number>(null);

  const [backMatrix, setBackMatrix] = useState<backgroundMatrix>(null);

  const [elemsInMatrix, setElemsInMatrix] = useState<Array<oneBlock>>([]);

  const [elemsContent, setElemsContent] = useState<Array<inputData>>([]);

  const [bgCrossFilling, setBgCrossFilling] = useState<boolean>(true);

  const defPage = useRef(null);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    function difference(a, b) {
      return Math.abs(a - b);
    }

    setWindowSize((prev) => {
      const nHeight = prev?.height;
      const nWidth = prev?.width;
      if (!nWidth || !nHeight) return {
        height,
        width
      };

      return difference(nHeight, height) > 100 ||
        difference(nWidth, width) > 100
        ? {
            height,
            width,
          }
        : prev;
    });
  }, [width, height]);

  useEffect(() => {
    if (!scrollSpyTag) return;

    const newSSConfig = createScrollSpyConfig(
      defPage.current,
      window.scrollY,
      document.body.offsetHeight,
      scrollSpyTag
    );
    dispatch(updatePosition(newSSConfig));
  }, [dispatch, scrollSpyTag]);

  useEffect(() => {
    if (pageBackground) {
      setElemsContent(pageBackground.backgroundItems);
      setBgCrossFilling(pageBackground.backgroundCrossFilling);
    }
  }, [pageBackground]);

  useEffect(() => {
    setBackMatrix({
      rowsNum: 3,
      colsNum: 3,
    });

    // console.log(`w: ${width}, h: ${height}`);
  }, [windowSize]);

  useEffect(() => {
    if (windowSize && backMatrix && elemsContent?.length > 0) {
      const blockSize = windowSize.height / backMatrix.rowsNum;
      const itemsInMatrix = backMatrix.colsNum * backMatrix.rowsNum;

      const newArr = new Array<oneBlock>();

      let contentIndex = 0;

      for (let i = 0; i < itemsInMatrix; i++) {
        if (bgCrossFilling)
          if (i % 2 === 0) {
            newArr.push({
              size: blockSize,
              content: {
                data:
                  elemsContent.length >= contentIndex
                    ? elemsContent[contentIndex].content.data
                    : null,
                contentDistance:
                  elemsContent.length >= contentIndex
                    ? elemsContent[contentIndex].content.contentDistance
                    : null,
                contentOffset:
                  elemsContent.length >= contentIndex
                    ? elemsContent[contentIndex].content.contentOffset
                    : null,
              },
            });
          } else {
            newArr.push({
              size: blockSize,
            });
            contentIndex--;
          }
        else {
          newArr.push({
            size: blockSize,
            content: {
              data:
                elemsContent.length >= contentIndex
                  ? elemsContent[contentIndex].content.data
                  : null,
              contentDistance:
                elemsContent.length >= contentIndex
                  ? elemsContent[contentIndex].content.contentDistance
                  : null,
              contentOffset:
                elemsContent.length >= contentIndex
                  ? elemsContent[contentIndex].content.contentOffset
                  : null,
            },
          });
        }

        contentIndex++;
      }

      setElemsInMatrix(newArr);
      setRowsBlockSize(blockSize * backMatrix.rowsNum + blockSize / 2);
    }
  }, [windowSize, backMatrix, elemsContent, bgCrossFilling]);

  const parallax = useCallback((e) => {
    const getItems = (inArr: NodeListOf<Element>): any => {
      if (inArr?.length > 0) return inArr;
      return null;
    };
    const bgElems = getItems(document.querySelectorAll(`.landing_bg_item`));

    if (bgElems) {
      bgElems.forEach((elem) => {
        const speed = elem.getAttribute("data-speed");

        const x =
          (window.innerWidth - e.pageX * (5 - (1 - parseFloat(speed)) * 10)) /
          100;
        const y =
          (window.innerWidth - e.pageY * (5 - (1 - parseFloat(speed)) * 10)) /
          100;

        elem.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    }
  }, []);

  //   Handle mouse moving
  useEffect(() => {
    document.addEventListener("mousemove", parallax);
    return () => {
      document.addEventListener("mousemove", parallax);
    };
  }, []);

  // - - - - - - - - - - - - - - - - - - - - - - - -

  return (
    <>
      <div className={styles.defaultLandingPage} id={pageId} ref={defPage}>
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "auto",
            right: "0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "end",
            minHeight: "100px",
            minWidth: "100px",
            zIndex: -1,

            maxWidth: `${
              rowsBlockSize ? rowsBlockSize.toString() + "px" : "auto"
            }`,
          }}
        >
          {elemsInMatrix
            ? elemsInMatrix.map((elem, index) => (
                <div
                  style={{
                    width:
                      elem.size * backMatrix.colsNum <= width
                        ? elem.size
                        : width / backMatrix.colsNum - 10 + "px",
                    height: elem.size,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    // border:"solid 1px red"
                  }}
                  key={`${index}_backElem`}
                >
                  {elem.content ? (
                    <div
                      style={{
                        opacity: elem.content.contentDistance,
                        width: `${elem.content.contentDistance * 150}%`,
                        height: `${elem.content.contentDistance * 150}%`,

                        filter: `blur(${
                          10 - elem.content.contentDistance * 10
                        }px)`,

                        maxWidth: "120%",
                        maxHeight: "120%",

                        transformOrigin: "center",
                        transform: `translate(${elem.content.contentOffset.left}px, ${elem.content.contentOffset.top}px)`,
                        position: "relative",
                      }}
                    >
                      <div
                        className={`landing_bg_item`}
                        data-speed={elem.content?.contentDistance}
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                        }}
                      >
                        {/*{elem.size}*/}
                        <Image
                          src={elem.content.data}
                          alt={`${index}_backItem`}
                          fill
                          sizes={"100%"}
                          priority={false}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>

        <div className={"container-fluid fluid-adaptive d-flex flex-column"}>
          <div className={"row"}>
            <div className={"col-md-7 d-flex h-100 flex-column"}>
              <MainLabel
                padding={
                  landingDescription?.titleOffset
                    ? landingDescription?.titleOffset
                    : 0
                }
                title={landingDescription?.title}
              />
              <h2 className={"w-50 align-self-start"}>
                {landingDescription?.subTitle}
              </h2>
            </div>
          </div>

          <div
            className={"row d-flex"}
            style={{
              minHeight: "70vh",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLandingPage;
