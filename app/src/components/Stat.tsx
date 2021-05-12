import classNames from "classnames";

const Stat = ({value, label, sup, secondary}: any) => {
  return (
    <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
        {label} { sup ? <sup>{sup}</sup> : null }
      </dt>
      <dd className={classNames('order-1 text-5xl font-extrabold', {'text-secondary-500': secondary, 'text-primary-500': !secondary})}>
        {value}
      </dd>
    </div>
  )
}

export default Stat;