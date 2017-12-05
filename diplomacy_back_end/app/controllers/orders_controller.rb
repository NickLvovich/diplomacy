class OrdersController < ApplicationController

  def index
    orders = Order.all
    render json:orders
  end

  def show
    order = order.find(params["id"])
    render json:order
  end

  def create
    order = Order.new(order_params)
    if order.save
      render json:order
    end
  end

  private

  def order_params
    params.require('order').permit(:turn_id, :unit_id, :phase, :order_type, :from_territory, :to_territory, :coast)
  end

end
