interface BadgeStockProps {
    stock: number;
    stockCritico: number;
}

function BadgeStock({ stock, stockCritico }: BadgeStockProps) {
    if (stock <= stockCritico){
        return <span className="text-danger">Stock crítico: {stock.toLocaleString('es-CL')}</span>
    }
    return <span>{stock.toLocaleString('es-CL')}</span>
}

export default BadgeStock