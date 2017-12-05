class CountriesController < ApplicationController

  def index
    countries = Country.all
    render json:countries
  end

  def show
    country = Country.find(params[:id])
    render json:country
  end

  def create
    country = Country.new(country_params)
    if country.save
      render json:user
    end
  end

  private

  def country_params
    params.require('country').permit(:name, :user_id, :game_id)
  end

end
