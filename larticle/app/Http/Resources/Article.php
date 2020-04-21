<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Article extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            "id" => $this->id,
            "title" => $this->title,
            //convert string to date and reformat it as Month Day(Suffix), Year
            "date" => date("F jS, Y", strtotime($this->created_at)),
            "author" => $this->author,
            "body" => $this->body,
        ];
    }

    public function with($request)
    {
        return [
            "author_url" => url('https://www.freecodecamp.org/'),
            "version" => "1.0.0"
        ];
    }
}
