import { getAllProject } from "../../services/services"
import { GET_PROJECT } from "../../ulti/setting"



export const projectManagerAction = () => {

    return (dispatch2) => {
        let projectArr = []
        let getProjectList = getAllProject()
        getProjectList.then((result) => {

            projectArr = result.data.content.map((project, index) => {
                return {
                    key: `${index}`,
                    id: `${project.id}`,
                    name: project.projectName,
                    categoryName: project.categoryName,
                    creator: project.creator.name,
                    tags: [project.members, project.id]
                }
            })

            let action = {
                type: GET_PROJECT,
                data: projectArr
            }

            dispatch2(action)
        })



    }
}