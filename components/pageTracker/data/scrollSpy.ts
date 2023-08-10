type interval = {
    b: number,
    e: number
}

export type scrollPosition = {
    y: number | null,
    percentScroll: number,

    percentInterval?: interval,
    tag?: string,
}

export interface IScrollSpyState{

    positions: Array<scrollPosition>,
    actualPosition: scrollPosition,
    updatePosition(position: scrollPosition, obj: IScrollSpyState): void,
    // setPositions(positions: Array<scrollPosition>): void,
    setActualPosition(pos: scrollPosition | number, obj: IScrollSpyState): void,
}


export const createScrollSpyConfig = (elem: Element, scrollY: number, pageSize: number, tag?: string) => {
    function GetOffset(el: Element) {
        const position = el.getBoundingClientRect();
        return {
            top: position.top + scrollY
        }
    }

    const newSSConfig: scrollPosition = {
        percentScroll: GetOffset(elem)?.top * 100
            / pageSize,
        y: GetOffset(elem)?.top,
        tag: tag ?? "Page name",
    }

    return newSSConfig;
}

export const getActualPosition = (scrollY: number, pageSize: number, obj: IScrollSpyState): scrollPosition => {

    const dynamicPosition: scrollPosition = {
        y: scrollY,
        percentScroll: scrollY * 100
            / pageSize,
    }

    let actualPosition = {} as scrollPosition;

    obj.positions.map((pos, i) => {
        if((dynamicPosition.percentScroll >= pos.percentInterval.b) &&
            (dynamicPosition.percentScroll < pos.percentInterval.e || pos.percentInterval.e === null)){
            actualPosition = pos;
        }
    })
    return actualPosition;
}

export const createScrollSpy = (): IScrollSpyState => {

    let that = {
        positions: new Array<scrollPosition>(),
        actualPosition: {} as scrollPosition,
    } as IScrollSpyState

    const setInterval = (obj: IScrollSpyState) => {
        obj.positions.map((pos, i)=>{
            pos.percentInterval = {
                b: pos.percentScroll,
                e: obj.positions[i + 1]?.percentScroll ?? null,
            };
        })
    }

    that.updatePosition = (position: scrollPosition, obj: IScrollSpyState) => {
        if(obj.positions.length > 0)
            obj.positions.map((elem, index) => {
                if (position.tag === elem.tag) {
                    obj.positions.splice(index, 1)
                }
            })

        obj.positions.push(position);
        obj.positions.sort(function (a, b){return a.percentScroll - b.percentScroll});
        setInterval(obj);
    }

    that.setActualPosition = (pos: scrollPosition | number, obj: IScrollSpyState) => {
        if(typeof pos === "number"){
            const l = obj.positions.length - 1;
            if(pos <= l)
                obj.actualPosition = obj.positions[pos];
            else
                obj.actualPosition = obj.actualPosition[l];
        }

        else
            obj.actualPosition = pos;

    }


    return that;
}

