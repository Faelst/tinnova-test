import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { ApiService as apiServiceClass } from "../services/api";
import style from '../styles/index.module.scss'

export default function Home() {
  const ApiService = new apiServiceClass();
  const defaultInputs = { id: "", veiculo: "", marca: "", ano: "", descricao: "", vendido: false }

  const [vehicleList, setVehicleList] = useState<any>([])
  const [vehicleBrandList, setVehicleBrandList] = useState<[String]>([''])

  const [vehicleFormData, setVehicleFormData] = useState(defaultInputs)
  const [registerApiResponse, setRegisterApiResponse] = useState('')

  const [vehicleUpdateFormData, setVehicleUpdateFormData] = useState(defaultInputs)
  const [enableUpdateFormData, setEnableUpdateFormData] = useState(false)
  const [updateApiResponse, setUpdateApiResponse] = useState()

  useEffect(() => {
    loadTableData()
    loadSelectVehicleBrands()
  }, [])

  const handleChangeInput = ({ target }) => setVehicleFormData({ ...vehicleFormData, [`${target.name}`]: target.value })
  const handleChangeInputUpdateForm = ({ target }) => setVehicleUpdateFormData({ ...vehicleUpdateFormData, [`${target.name}`]: target.value })
  const handleChangeCheckboxSold = ({ target }) => setVehicleUpdateFormData({ ...vehicleUpdateFormData, [`${target.name}`]: !vehicleUpdateFormData.vendido })
  const handleClearInputs = () => setVehicleFormData(defaultInputs)

  const loadTableData = async () => {
    const data: any = await ApiService.getVehicles()
    const vehicles = data.data.veiculos
    setVehicleList(vehicles)
  }

  const loadSelectVehicleBrands = async () => {
    const { data }: any = await ApiService.getVehicleBrands()
    setVehicleBrandList(data.marcas)
  }

  const saveNewVehicle = async () => {
    const data: any = await ApiService.registerNewVehicle(vehicleFormData)

    if (data.status == 201)
      setRegisterApiResponse(data.data)
    else
      setRegisterApiResponse({ status: false, veiculo: defaultInputs } as any)

    handleClearInputs()
  }

  const handleIdChange = async ({ target }) => {

    if (!(String(target.value).length)) {
      setEnableUpdateFormData(false)
      setVehicleUpdateFormData(defaultInputs)
      return
    }

    const data: any = await ApiService.getVehicleById(target.value)

    if (!data.data.status) {
      setEnableUpdateFormData(false)
      setVehicleUpdateFormData(defaultInputs)
      return setUpdateApiResponse({ ...data.data })
    }

    const vehicle = data.data.veiculo
    setVehicleUpdateFormData(vehicle)
    setEnableUpdateFormData(true)
    setUpdateApiResponse({} as any)
  }

  const updateVehicle = async () => {
    const data: any = await ApiService.updateVehicle(vehicleUpdateFormData)

    if (!data.data.status) return

    setUpdateApiResponse({ ...data.data })
    setVehicleUpdateFormData(defaultInputs)
  }

  const deleteVehicle = async () => {
    const data: any = await ApiService.deleteVehicle({ vehicleId: vehicleUpdateFormData.id})
    setUpdateApiResponse({ ...data.data })
    setVehicleUpdateFormData(defaultInputs)
  }

  return (<>
    <Header />

    <Card>
      <h4>Listagem de veiculos</h4>

      <hr />

      <div className={style.scrollaTableDiv}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Veiculo</th>
              <th>Ano</th>
              <th>Marca</th>
              <th>Descricao</th>
              <th>Vendido</th>
            </tr>
          </thead>
          <tbody>
            {vehicleList.map(vehicle => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.veiculo}</td>
                <td>{vehicle.ano}</td>
                <td>{vehicle.marca}</td>
                <td>{String(vehicle.descricao).length > 200 ? `${vehicle.descricao.slice(0, 240)} ....` : vehicle.descricao}</td>
                <td>{vehicle.vendido ? "Vendido" : "Disponivel"}</td>
              </tr>
            )
            )
            }
          </tbody>
        </table>
      </div>
    </Card>

    <Card>
      <h4>Cadastro de Veiculos</h4>
      <hr />
      <form className={style.formRegisterVehicle}>
        <div>
          <div className={style.formGroup}>
            <label>Veiculo:</label>
            <input value={vehicleFormData.veiculo} type="text" name="veiculo" onChange={handleChangeInput} />
          </div>
          <div className={style.formGroup}>
            <label>Marca:</label>
            <select id="selectMarca" name="marca" onChange={handleChangeInput} value={vehicleFormData.marca}>
              <option value="">Selecione marca do veiculo</option>
              {vehicleBrandList.map((e: String | any) => (
                <option value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className={style.formGroup}>
            <label>Ano:</label>
            <input type="text" name="ano" onChange={handleChangeInput} value={vehicleFormData.ano} />
          </div>
          <div className={style.formGroup}>
            <label>Descrição:</label>
            <textarea rows={200} cols={80} name="descricao" onChange={handleChangeInput} value={vehicleFormData.descricao} />
          </div>
          <div className={style.formBtnGroup}>
            <button type="button" onClick={handleClearInputs}>Limpar</button>
            <button type="button" onClick={saveNewVehicle} > Salvar</button>
          </div>
        </div>

        <div className={style.responseRegisterVehicle} >
          <pre>{JSON.stringify(registerApiResponse, undefined, 2)}</pre>
        </div>
      </form>
    </Card>

    <Card>
      <h4>Alterar ou Excluir Veiculos</h4>
      <hr />
      <form className={style.formRegisterVehicle}>
        <div>
          <div className={style.formGroup}>
            <label>ID do Veiculo</label>
            <input type="text" name='id' onBlur={handleIdChange} onChange={handleChangeInputUpdateForm} value={vehicleUpdateFormData.id} />
          </div>
          <div className={style.formGroup}>
            <label className={!enableUpdateFormData ? style.formLabelDisabled : ""}>Veiculo:</label>
            <input value={vehicleUpdateFormData.veiculo} type="text" name='veiculo' onChange={handleChangeInputUpdateForm} disabled={!enableUpdateFormData} />
          </div>
          <div className={style.formGroup}>
            <label className={!enableUpdateFormData ? style.formLabelDisabled : ""}>Marca:</label>
            <select id="selectMarca" name='marca' onChange={handleChangeInputUpdateForm} value={vehicleUpdateFormData.marca} disabled={!enableUpdateFormData}>
              <option value="">Selecione marca do veiculo</option>
              {vehicleBrandList.map((e: String | any) => (
                <option value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className={style.formGroup}>
            <label className={!enableUpdateFormData ? style.formLabelDisabled : ""}>Ano:</label>
            <input type="text" name="ano" onChange={handleChangeInputUpdateForm} value={vehicleUpdateFormData.ano} disabled={!enableUpdateFormData} />
          </div>
          <div className={style.formGroup}>
            <label className={!enableUpdateFormData ? style.formLabelDisabled : ""}>Descrição:</label>
            <textarea rows={200} cols={80} name="descricao" onChange={handleChangeInputUpdateForm} value={vehicleUpdateFormData.descricao} disabled={!enableUpdateFormData} />
          </div>
          <div>
            <input type="checkbox" id="vehicleSold" name='vendido' onClick={handleChangeCheckboxSold} checked={vehicleUpdateFormData.vendido} />
            <label> Veiculo vendido ? </ label>
          </div>
          <div className={style.formBtnGroup}>
            <button type="button" onClick={deleteVehicle} disabled={!enableUpdateFormData}>Deletar</button>
            <button type="button" onClick={updateVehicle} disabled={!enableUpdateFormData}>Alterar</button>
          </div>
        </div>

        <div className={style.responseRegisterVehicle} >
          <pre>{JSON.stringify(updateApiResponse, undefined, 2)}</pre>
        </div>
      </form>
    </Card>
  </>
  )
}