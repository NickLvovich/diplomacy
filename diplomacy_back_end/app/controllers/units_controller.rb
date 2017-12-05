class UnitsController < ApplicationController

  def index
    units = Unit.all
    render json:units
  end

  def show
    unit = Unit.find(params["id"])
    render json:unit
  end

  def create
    byebug
    unit = Unit.new(unit_params)
    if unit.save
      render json:unit
    end
  end

  def update
    unit = Unit.find(params[:id])
    if unit.update(unit_params)
      render json:unit
    end
  end

  private

  def unit_params
    params.require('unit').permit(:unit_type, :coast, :territory, :country_id)
  end

end
