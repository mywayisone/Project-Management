import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
// import DebuggCode from "@/Components/DebuggCode";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index(projects) {
  var queryParams = {}


  const searchChangedField = (name, value) => {
    if (value) {
      queryParams[name] = value;
    }
    else {
      delete queryParams[name];
    }
    router.get(route('project.index'), queryParams);
  };

  const onKeyPress = (name, e) => {
    console.log(`Key pressed: ${e.key}`);
    if (e.key === 'Enter') {
      e.preventDefault();
      searchChangedField(name, e.target.value);
    }
  };

  return (<AuthenticatedLayout
    header={
      <h2 className="text-xl font-semibold leading-tight text-gray-800">
        Projects
      </h2>
    }
  >
    <Head title="Projects" />
    {/* <DebuggCode /> */}
    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">
            {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 border-b-2 border-gray-500 dark:text-gray-400">
                <tr className="text-nowrap">
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Image</th>
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Create Date</th>
                  <th className="px-3 py-3">Due Date</th>
                  <th className="px-3 py-3">Created By</th>
                  <th className="px-3 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 border-b-2 border-gray-500 dark:text-gray-400">
                <tr className="text-nowrap">
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3">
                    <TextInput
                      className="w-full"
                      placeholder="Project Name"
                      onBlur={e => searchChangedField('name', e.target.value)}
                      onKeyDown={(e) => onKeyPress('name', e)}
                    />
                  </th>
                  <th className="px-3 py-3">
                    <SelectInput
                      className="w-full"
                      onChange={e => searchChangedField('status', e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </SelectInput>
                  </th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {projects.projects.data.map((project) => (
                  <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-3 py-2">{project.id}</td>
                    <td className="px-3 py-2">
                      <img src={project.image_path} style={{ width: 60 }} alt="" />
                    </td>
                    <td className="px-3 py-2">{project.name}</td>
                    <td className="px-3 py-2">
                      <span className={"px-2 py-2 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                    <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                    <td className="px-3 py-2">{project.createdBy.name}</td>
                    <td className="px-3 py-2">
                      <Link href={route("project.edit", project.id)} className="font-medium text-blue-600 dark:text-blue-400 hover:underline mx-1"
                      >
                        Edit
                      </Link>
                      <Link href={route("project.destroy", project.id)} className="font-medium text-red-600 dark:text-red-400 hover:underline mx-1"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
            <Pagination links={projects.projects.meta.links}></Pagination>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>);
}