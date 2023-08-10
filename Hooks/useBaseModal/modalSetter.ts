import React from "react";

export type modalsBasics = {
  typeName: string;
  _header: string;
  _paragraph: string;
};

type indexedModal = {
  index: number;
  modal: modalsBasics;
};

const defaultModalName = {
  defModalName: "default",
  defModalHeader: "Hello, modal",
  defModalParagraph: "This is paragraph",
};

export class modalStater {
  private modalName: string;
  private header: string;
  private paragraph: string;
  private state: boolean;
  private dataUpdater: React.Dispatch<modalStater>;
  private modalsTypes: Array<modalsBasics>;

  private onClose: Function;

  constructor(
    header = "",
    paragraph = "",
    state = false,
    dataUpdater = null,
    modalsTypes?: Array<modalsBasics>
  ) {
    this.state = state;
    this.dataUpdater = dataUpdater;
    this.modalsTypes = [];

    if (!modalsTypes) {
      this.modalsTypes.push({
        typeName: defaultModalName.defModalName,

        _header: header ? header : defaultModalName.defModalHeader,

        _paragraph: paragraph ? paragraph : defaultModalName.defModalParagraph,
      });
      (this.modalName = defaultModalName.defModalName),
        (this.header = this.getModalByName(
          defaultModalName.defModalName
        )?.modal?._header);
      this.header = this.getModalByName(
        defaultModalName.defModalName
      )?.modal?._paragraph;
    } else this.setModalTypes(modalsTypes);
  }

  public editModal(header: string, paragraph: string): void {
    this.header = header;
    this.paragraph = paragraph;
  }

  public editModals(
    modals: Array<modalsBasics>,
    startModalIndex: number = 0,
    addNew: boolean = false
  ): void {
    if (addNew) this.setModalTypes(modals, startModalIndex);
    else {
      this.modalsTypes = [];
      this.setModalTypes(modals, startModalIndex);
    }
  }

  get getHeader(): string {
    return this.header;
  }

  get getParagraph(): string {
    return this.paragraph;
  }

  get getState(): boolean {
    return this.state;
  }

  private setModalTypes = (types: Array<modalsBasics>, idx: number = 0) => {
    this.modalsTypes.push(...types);

    this.header = types[idx]
      ? types[idx]._header
      : defaultModalName.defModalHeader;

    this.paragraph = types[idx]
      ? types[idx]._paragraph
      : defaultModalName.defModalParagraph;

    this.modalName = types[idx]
      ? types[idx].typeName
      : defaultModalName.defModalName;
  };

  public isCurrentModal(name: string): boolean {
    if (name)
      return (
        name.toString().toLowerCase() ===
        this.modalName.toString().toLowerCase()
      );
    else return false;
  }

  public getModalByName = (name: string): indexedModal => {
    if (name) {
      let currentIndex: number = -1;
      const modal = this.modalsTypes.find((e, i) => {
        currentIndex = i;
        return (
          e.typeName.toString().toLowerCase() === name.toString().toLowerCase()
        );
      });

      return {
        modal: modal,
        index: currentIndex,
      };
    } else return null;
  };

  public applyModalByName = (name: string): Promise<indexedModal> => {
    return new Promise((resolve, reject) => {
      if (!name) reject(null);
      else {
        const newModal = this.getModalByName(name);

        this.header = newModal?.modal?._header;
        this.paragraph = newModal?.modal?._paragraph;
        this.modalName = newModal?.modal?.typeName;

        resolve(newModal);
      }
    });
  };

  public switch = (newState: boolean): Promise<boolean>  => {
    this.state = newState;
    if (!newState && newState !== undefined && this.onClose) this.onClose();
    this.update();

    return new Promise<boolean>((resolve) => resolve(this.state));
  };

  set setOnClose(data: Function) {
    this.onClose = data;
  }

  public setDataUpdater = (updater: React.Dispatch<modalStater>) =>
    (this.dataUpdater = updater);

  private update = () => {
    if (this.dataUpdater) {
      this.dataUpdater(
        new modalStater(
          this.header,
          this.paragraph,
          this.state,
          this.dataUpdater
        )
      );
    }
  };
}
