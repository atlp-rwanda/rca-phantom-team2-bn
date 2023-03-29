import { FindOptions, ModelStatic, Model } from "sequelize"
import to from "await-to-js"


export default class Paginator<T extends Model> {

    private model: ModelStatic<T>


    constructor(model: ModelStatic<T>) {
        this.model = model
    }


    async paginate (options: FindOptions, page: number, limit: number) {
        const offset = limit * (page - 1)
        const [errorTotal, totalResults] = await to(this.model.count<T>(options))
        const [error, results] = await to(this.model.findAll<T>({ ...options, offset, limit}))
        
        if(errorTotal || error) throw errorTotal? errorTotal:error
        
        const lastPage = totalResults > 0 ? Math.ceil(totalResults/limit) : 0
        const hasMorePages = page < lastPage
        const hasPrevPages = page > 1
        
        return {
            prevPage: hasPrevPages? (page - 1):undefined,
            currentPage: page,
            nextPage: hasMorePages? ++page:undefined,
            lastPage: lastPage,
            total: totalResults,
            hasPrev: hasPrevPages,
            hasNext: hasMorePages,
            data: results
        }
        

    }
}