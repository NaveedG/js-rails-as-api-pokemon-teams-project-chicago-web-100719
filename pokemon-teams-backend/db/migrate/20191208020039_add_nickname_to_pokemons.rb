class AddNicknameToPokemons < ActiveRecord::Migration[6.0]
  def change
    add_column :pokemons, :nickname, :string
  end
end
