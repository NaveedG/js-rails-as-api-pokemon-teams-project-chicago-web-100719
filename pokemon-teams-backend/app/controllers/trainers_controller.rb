class TrainersController < ApplicationController

  def index
    trainers = Trainer.all 
    render json: trainers, except: [:created_at, :updated_at], 
      :include => { :pokemons => 
        { :only => [:id, :nickname, :species, :trainer_id] }
       }
  end

end
