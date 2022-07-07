# Sherlock 

## Installation

Hunt down social media accounts by username across [social networks](https://github.com/sherlock-project/sherlock/blob/master/sites.md)

```sh
# clone the repo
$ git clone https://github.com/sherlock-project/sherlock.git

# change the working directory to sherlock
$ cd sherlock

# install the requirements
$ python3 -m pip install -r requirements.txt
```

## Usage

```sh
$ python3 sherlock --help

usage: sherlock [-h] [--version] [--verbose] [--folderoutput FOLDEROUTPUT]
                [--output OUTPUT] [--tor] [--unique-tor] [--csv]
                [--site SITE_NAME] [--proxy PROXY_URL] [--json JSON_FILE]
                [--timeout TIMEOUT] [--print-all] [--print-found] [--no-color]
                [--browse] [--local]
                USERNAMES [USERNAMES ...]

Sherlock: Find Usernames Across Social Networks (Version 0.14.0)

positional arguments:
  USERNAMES             One or more usernames to check with social networks.

optional arguments:
  -h, --help            show this help message and exit
  --version             Display version information and dependencies.
  --verbose, -v, -d, --debug
                        Display extra debugging information and metrics.
  --folderoutput FOLDEROUTPUT, -fo FOLDEROUTPUT
                        If using multiple usernames, the output of the results
                        will be saved to this folder.
  --output OUTPUT, -o OUTPUT
                        If using single username, the output of the result
                        will be saved to this file.
  --tor, -t             Make requests over Tor; increases runtime; requires
                        Tor to be installed and in system path.
  --unique-tor, -u      Make requests over Tor with new Tor circuit after each
                        request; increases runtime; requires Tor to be
                        installed and in system path.
  --csv                 Create Comma-Separated Values (CSV) File.
  --site SITE_NAME      Limit analysis to just the listed sites. Add multiple
                        options to specify more than one site.
  --proxy PROXY_URL, -p PROXY_URL
                        Make requests over a proxy. e.g.
                        socks5://127.0.0.1:1080
  --json JSON_FILE, -j JSON_FILE
                        Load data from a JSON file or an online, valid, JSON
                        file.
  --timeout TIMEOUT     Time (in seconds) to wait for response to requests.
                        Default timeout is infinity. A longer timeout will be
                        more likely to get results from slow sites. On the
                        other hand, this may cause a long delay to gather all
                        results.
  --print-all           Output sites where the username was not found.
  --print-found         Output sites where the username was found.
  --no-color            Dont color terminal output
  --browse, -b          Browse to all results on default browser.
  --local, -l           Force the use of the local data.json file.
```

To search for only one user:

```sh
python3 sherlock user123
```

To search for more than one user:

```sh
python3 sherlock user1 user2 user3
```

Accounts found will be stored in an individual text file with the corresponding username (e.g `user123.txt`).

## Anaconda (Windows) Notes

If you are using Anaconda in Windows, using `python3` might not work. Use `python` instead.

### Docker Notes

If docker is installed you can build an image and run this as a container.

```sh
docker build -t mysherlock-image .
```

Once the image is built, sherlock can be invoked by running the following:

```sh
docker run --rm -t mysherlock-image user123
```

The optional `--rm` flag removes the container filesystem on completion to prevent cruft build-up. See: `https://docs.docker.com/engine/reference/run/#clean-up---rm`

The optional `-t` flag allocates a pseudo-TTY which allows colored output. See: `https://docs.docker.com/engine/reference/run/#foreground`

Use the following command to access the saved results:

```sh
docker run --rm -t -v "$PWD/results:/opt/sherlock/results" mysherlock-image -o /opt/sherlock/results/text.txt user123
```

The `-v` `$PWD/results:/opt/sherlock/results` options tell docker to create (or use) the folder results in the present working directory and to mount it at `/opt/sherlock/results` on the docker container. The `-o` `/opt/sherlock/results/text.txt` option tells sherlock to output the result.

Or you can use `Docker Hub` to run sherlock:

```sh
docker run theyahya/sherlock user123
```

### Using docker-compose

You can use the docker-compose.yml file from the repository and use this command:

```sh
docker-compose run sherlock -o /opt/sherlock/results/text.txt user123
```