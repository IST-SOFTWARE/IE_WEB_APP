import {ICreationFnc, ICartIDGetterForCreation, IUpdateFnc, IUpdatedDataResolver, ICreateDataResolver, ICartActionsConfig, ICartResolversConfig } from "./common"

export class ISTCartAdder<CREATION_DATA_TYPE, UPDATE_DATA_TYPE, MUTATION_VARS_TYPE>{

    private _newCartIDGetterForCreation: ICartIDGetterForCreation<CREATION_DATA_TYPE> = undefined
    private _updatedDataResolver: IUpdatedDataResolver<UPDATE_DATA_TYPE> = undefined
    private _createDataResolver: ICreateDataResolver<CREATION_DATA_TYPE> = undefined

    private _cartCreationFnc: ICreationFnc<MUTATION_VARS_TYPE, CREATION_DATA_TYPE> = undefined
    private _cartUpdateFnc: IUpdateFnc<MUTATION_VARS_TYPE, UPDATE_DATA_TYPE> = undefined


    /**
     * Cart getting session id resolver
     */
    set setCartIDGetterForCreation(getter: ICartIDGetterForCreation<CREATION_DATA_TYPE>){
        this._newCartIDGetterForCreation = getter;
    }

    get getCartIDGetterForCreation(): ICartIDGetterForCreation<CREATION_DATA_TYPE>{
        return this._newCartIDGetterForCreation
    }

    /**
     * Cart creation resolver
     */
    set setCreateDataResolver(resolver: ICreateDataResolver<CREATION_DATA_TYPE>){
        this._createDataResolver = resolver;
    }

    get getCreateDataResolver():  ICreateDataResolver<CREATION_DATA_TYPE>{
        return this._createDataResolver
    }

    /**
     * Cart update resolver
     */
    set setUpdatedDataResolver(resolver: IUpdatedDataResolver<UPDATE_DATA_TYPE>){
        this._updatedDataResolver = resolver;
    }

    get getUpdatedDataResolver():  IUpdatedDataResolver<UPDATE_DATA_TYPE>{
        return this._updatedDataResolver
    }
    
    
    public async update(vars: MUTATION_VARS_TYPE): Promise<UPDATE_DATA_TYPE> {
        return await this._cartUpdateFnc(vars)
    }

    public async create(vars: MUTATION_VARS_TYPE): Promise<CREATION_DATA_TYPE> {
        return await this._cartCreationFnc(vars)
    }


    constructor(
        cartActionsConfig: ICartActionsConfig<MUTATION_VARS_TYPE, CREATION_DATA_TYPE, UPDATE_DATA_TYPE>,
        cartResolversConfig?: ICartResolversConfig<CREATION_DATA_TYPE, UPDATE_DATA_TYPE>
    ){
        this._cartCreationFnc = cartActionsConfig.creation;
        this._cartUpdateFnc = cartActionsConfig.update;

        if(cartResolversConfig){
            this.setUpdatedDataResolver = cartResolversConfig.updateResolver;
            this.setCreateDataResolver = cartResolversConfig.creationResolver;
            this.setCartIDGetterForCreation = cartResolversConfig.cartIDGetterForCreation;
        }
    }

}