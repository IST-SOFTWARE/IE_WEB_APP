import React from "react";

export class modalStater{
    constructor(
        public header:string = "Hello, modal",
        public paragraph:string = "This is paragraph",
        public state:boolean = false,
        public dataUpdater: React.Dispatch<modalStater> | null = null,
        public childrenState: boolean | null = null,
    )
    {
        this.header = header;
        this.paragraph = paragraph;
        this.state = state;
        this.dataUpdater = dataUpdater;
    }

    public editModal = (header: string, paragraph: string, chState?: boolean) =>{
        this.header = header;
        this.paragraph = paragraph;
        this.childrenState = chState;

        this.update();
    }

    public switch = (newState: boolean) =>{
        this.state = newState;
        this.update();
    }

    public setDataUpdater = (updater: React.Dispatch<modalStater>) =>
        this.dataUpdater = updater;

    public setChState = (newState: boolean) => {
        this.childrenState = newState;
        this.update();
    }

    private update = () =>{
        if(this.dataUpdater) {
            this.dataUpdater(
                new modalStater(
                    this.header, this.paragraph,
                    this.state, this.dataUpdater,
                    this.childrenState,
                )
            );
        }
    }
}