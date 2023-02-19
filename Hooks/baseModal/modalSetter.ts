import React from "react";

export type modalsBasics = {
    typeName: string,
    _header: string
    _paragraph: string
}

const defaultModalName = {
    defModalName: "default",
    defModalHeader: "Hello, modal",
    defModalParagraph: "This is paragraph"
}

export class modalStater{

    private modalName: string
    private header:string
    private paragraph:string
    private state:boolean
    private dataUpdater: React.Dispatch<modalStater>
    private modalsTypes: Array<modalsBasics>

    constructor(header = "",
                paragraph = "",
                state= false,
                dataUpdater = null,
                modalsTypes?: Array<modalsBasics>
    )
    {
        this.state = state;
        this.dataUpdater = dataUpdater;
        this.modalsTypes = [];

        if(!modalsTypes) {
            this.modalsTypes.push(
                {
                    typeName: defaultModalName.defModalName,

                    _header: header ? header :
                        defaultModalName.defModalHeader,

                    _paragraph: paragraph ? paragraph :
                        defaultModalName.defModalParagraph
                }
            )
            this.modalName = defaultModalName.defModalName,
            this.header = this.getModalByName(defaultModalName.defModalName)._header;
            this.header = this.getModalByName(defaultModalName.defModalName)._paragraph;
        }

        else
            this.setModalTypes(modalsTypes);
    }

    public editModal(
        header: string,
        paragraph: string,
    ):void
    {
        this.header = header;
        this.paragraph = paragraph;
    }

    public editModals(
        modals: Array<modalsBasics>,
        startModalIndex: number = 0,
        addNew: boolean = false
    ):void
    {
        if(addNew)
            this.setModalTypes(modals, startModalIndex)
        else{
            this.modalsTypes = [];
            this.setModalTypes(modals, startModalIndex)
        }

        this.update();
    }

    get getHeader():string{
        return this.header
    }

    get getParagraph():string{
        return this.paragraph
    }

    get getState():boolean{
        return this.state
    }

    private setModalTypes = (types: Array<modalsBasics>, idx: number = 0) => {
        this.modalsTypes.push(...types)

        this.header = types[idx] ? types[idx]._header :
            defaultModalName.defModalHeader

        this.paragraph = types[idx] ? types[idx]._paragraph :
            defaultModalName.defModalParagraph

        this.modalName = types[idx] ? types[idx].typeName :
            defaultModalName.defModalName
    }

    public isCurrentModal(name: string):boolean{
        return name.toString().toLowerCase() ===
            this.modalName.toString().toLowerCase()
    }

    public getModalByName = (name: string):modalsBasics => {
        return this.modalsTypes.find(e =>
            e.typeName.toString().toLowerCase() ===
            name.toString().toLowerCase()
        )
    }

    public applyModalByName = (name: string):void => {
        const newModal = this.modalsTypes.find(e =>
            e.typeName.toString().toLowerCase() ===
            name.toString().toLowerCase()
        )

        this.header = newModal?._header;
        this.paragraph = newModal?._paragraph;
        this.modalName = newModal?.typeName;

        this.update();
    }



    public switch = (newState: boolean) =>{
        this.state = newState;
        this.update();
    }

    public setDataUpdater = (updater: React.Dispatch<modalStater>) =>
        this.dataUpdater = updater;


    private update = () =>{
        if(this.dataUpdater) {
            this.dataUpdater(
                new modalStater(
                    this.header, this.paragraph,
                    this.state, this.dataUpdater,
                )
            );
        }
    }
}