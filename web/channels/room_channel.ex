defmodule RockPaperScissors.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", _msg, socket) do
    {:ok, socket}
  end

  def handle_in("bc", _msg, socket) do
    broadcast!(socket, "starter", %{})
    {:noreply, socket}
  end
end
